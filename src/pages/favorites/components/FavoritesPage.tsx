import React from 'react'

const FavoritesPage = () => {
  const allFolders = {
    firstFolder: {
      firstSubFolder1: {
        secondSubFolder1:{},
        secondSubFolder2: {
          thirdSubFolder1:{}
        },
        secondSubFolder3: {

        }
      },
      firstSubFolder2: {
        secondSubFolder2: {
          thirdSubFolder1: {},
          thirdSubFolder2: {
            forthSubFolder1: {}
          }
        }
      }
    }
  }

  const renderFolders = (folders) => {
    return Object.keys(folders).map((folderName) => (
      <div key={folderName}>
        <p>{folderName}</p>
        {Object.keys(folders[folderName]).length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {renderFolders(folders[folderName])}
          </div>
        )}
      </div>
    ));
  }
  return (
    <div>{renderFolders(allFolders)}</div>
  )
}

export default FavoritesPage