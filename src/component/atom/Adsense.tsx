import { useEffect } from 'react';

import { getClass } from 'util/common';

import styles from './Adsense.module.scss';

const isDev = process.env.NODE_ENV !== 'production';
type AdType = 'vertical' | 'modal' | 'overlay';
const slot: { [type in AdType]: string } = {
  vertical: '8640808975',
  modal: '5986725473',
  overlay: '1897536726',
};

interface Props {
  type: AdType;
}

function Adsense({ type }: Props) {
  const containerStyle = getClass(['container', type], styles);

  useEffect(() => {
    if (isDev) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(`adsense: ${error}`);
    }
  }, []);

  return isDev ? (
    <div className={containerStyle}></div>
  ) : (
    <ins
      className={containerStyle}
      data-ad-client="ca-pub-8102876779722153"
      data-ad-slot={slot[type]}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default Adsense;
