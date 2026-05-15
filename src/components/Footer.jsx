import React from 'react'
import { useI18n } from '../i18n/i18nContext'

export default function Footer() {
  const { t } = useI18n()
  return (
		<footer className="border-t border-(--border) mt-12">
			<div className="max-w-6xl w-full mx-auto px-4 pt-6 text-center text-sm text-(--muted-foreground)">
				{t('footer.text')}
			</div>
		</footer>
  );
}
