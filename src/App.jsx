import Header from './components/Header.jsx'
import ImageDropZone from './components/ImageDropZone.jsx'
import ImageList from './components/ImageList.jsx'
import ActionBar from './components/ActionBar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
		<>
			<Header />
			<main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
				<div className='mb-6'>
                    <h1 className="text-2xl font-semibold tracking-tight text-(--foreground)">
                        Générer un PDF sécurisé
                    </h1>
                    <p className="mt-1 text-base text-(--muted-foreground)">
                        Importez ou capturez vos images, réorganisez-les, puis
                        exportez en PDF
                    </p>
                </div>
				<ImageDropZone />
				<ImageList />
				<ActionBar />
			</main>
			<Footer />
		</>
  );
}

export default App
