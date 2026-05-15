import Header from './components/Header.jsx'
import ImageDropZone from './components/ImageDropZone.jsx'
import ImageList from './components/ImageList.jsx'
import ActionBar from './components/ActionBar.jsx'
import Footer from './components/Footer.jsx'
import Badges from './components/ui/Badges.jsx'
import { ShieldCheck, Lock, Eye } from "lucide-react";
import { useI18n } from './i18n/i18nContext.jsx'

function App() {
    const { t } = useI18n()
  return (
		<>
			<Header />
			<main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
				<div className='mb-6'>
                    <h1 className="text-2xl font-semibold tracking-tight text-(--foreground)">
                        {t('main.title')}
                    </h1>
                    <p className="mt-1 text-base text-(--muted-foreground)">
                        {t('main.description')}
                    </p>
                </div>
                <div className="flex gap-2 mb-4">
                    <Badges><ShieldCheck className="mr-1 h-4 w-4" />{t('main.badges.ram')}</Badges>
                    <Badges><Lock className="mr-1 h-4 w-4" />{t('main.badges.rgpd')}</Badges>
                    <Badges><Eye className="mr-1 h-4 w-4" />{t('main.badges.noTracking')}</Badges>
                </div>
				<div className="grid grid-cols-1 gap-5 sm:gap-10 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <ImageDropZone />
                        <ImageList />
                    </div>
                    <div className="sm:col-span-2">
                        <ActionBar />
                    </div>
                </div>
			</main>
			<Footer />
		</>
  );
}

export default App
