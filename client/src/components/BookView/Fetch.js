import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import packageJson from '../../../package.json';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

const handleAskPassword = (e) => {
  // Provide the password here, or get it from user input or any other source
  e.verifyPassword('bookWeb757');
};

const Fetch = () => {
  let params = useParams();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage } =
    pageNavigationPluginInstance;
    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  async function getFile() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/drive/` + params.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        responseType: 'blob'
      });
      setPdfFile(response.url)
      const fileBlob = await response.blob();
      return fileBlob;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getFile();
  }, [])
  return (
    <div>
      {pdfFile ? <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          height: window.innerHeight,
        }}
      >
        <div
          style={{
            position:'sticky',
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            // padding: '2px',
            zIndex:'1',
          }}
        >
          <div style={{ padding: '0px 2px' }}>
            <GoToPreviousPage />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <CurrentPageInput />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <GoToNextPageButton />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomOutButton />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomPopover />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomInButton />
          </div>
        </div>
        <div
          style={{
            userSelect: 'none' ,
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${packageJson.dependencies['pdfjs-dist'].replace(/^\^/, '')}/build/pdf.worker.min.js`}>
            <Viewer theme='dark' fileUrl={pdfFile} plugins={[pageNavigationPluginInstance,zoomPluginInstance]}  onDocumentAskPassword={handleAskPassword} />;
          </Worker>
        </div>
      </div> : null}
    </div>
  )
}

export default Fetch