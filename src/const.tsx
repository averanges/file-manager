interface IDoughnutProps {
  documentsFilesSize : number,
  imageFilesSize: number,
  mediaFilesSize: number,
  otherFilesSize: number,
}

export const useDataSetDoughnut = ({documentsFilesSize, imageFilesSize, mediaFilesSize, otherFilesSize}: IDoughnutProps) => {
  const dataSetDoughnut = {
    labels: [
      'Documents',
      'Images',
      'Media&Music',
      'Other Files'
    ],
    datasets: [{
      label: 'All Files Dataset',
      data: [documentsFilesSize, imageFilesSize, mediaFilesSize, otherFilesSize],
      backgroundColor: [
        'rgb(124,161,255,0.5)',
        'rgb(255,125,160,0.5)',
        'rgb(152,120,221,0.5)',
        'rgb(255,129,50,0.5)',
      ],
      hoverOffset: 4
    }]
  }
  return {dataSetDoughnut}
}
