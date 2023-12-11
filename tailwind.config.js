/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/index.css',
    './src/App.tsx',
    './src/main.tsx',
    './src/DashboardLayout.tsx',
    './src/MainPage.tsx',
    './src/components/cards/CategoryCard.tsx',
    './src/components/cards/FolderCard.tsx',
    './src/components/cards/ListItem.tsx',
    './src/components/animations/LoadingSpinner.tsx',
    './src/components/modalWindows/modalWindowLayout.tsx',
    './src/components/modalWindows/UploadPopup.tsx',
    './src/components/audioPlayer/AudioPlayerComponent.tsx',
    './src/components/modalWindows/NewFolderModalWindow.tsx',
    './src/modules/dashboardHeader/components/DashboardHeader.tsx',
    './src/modules/dashboardHeader/ui/headerButtons.tsx',
    './src/modules/dashboardSidebar/components/DashboardSidebar.tsx',
    './src/modules/dashboardSidebar/components/FolderMenuItem.tsx',
    './src/modules/dashboardSidebar/ui/sidebarButtons.tsx',
    './src/pages/dashboardPage/components/DashboardPage.tsx',
    './src/pages/categoryPage/components/CategoryPage.tsx',
    './src/pages/updatesPage/components/UpdatesPage.tsx',
    './src/pages/favorites/components/FavoritesPage.tsx',
    './src/pages/signupPage/components/SignupPage.tsx',
    './src/pages/authPage/components/AuthPage.tsx',
    './src/pages/updatesPage/components/FileItem.tsx',
    './src/pages/folderPage/components/FolderPage.tsx',
    './src/pages/recycleBinPage/components/RecycleBinPage.tsx',
    './src/ui/cards//CategoryCard.tsx',
    './src/ui/svg/svg.tsx',
  ],
  theme: {
    extend: {
      colors: {
        "orange-prime" : "#FF8132",
        "orange-opacity" : "rgba(255,129,50,0.5)",
        "blue-prime" : "#7CA1FF",
        "blue-opacity" : "rgba(124,161,255,0.5)",
        "pink-prime" : "#FF7DA0",
        "pink-opacity" : "rgba(255,125,160,0.5)",
        "purple-prime" : "#9878DD",
        "purple-opacity" : "rgba(152,120,221,0.5)",
      }
    },
  },
  plugins: [],
  safelist: [
    "rgba(124,161,255,0.5)",
    "rgba(152,120,221,0.5)",
    "pink-opacity",
    "purple-opacity",
    "#FF8132"
  ]
}

