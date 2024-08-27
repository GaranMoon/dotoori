import { useEffect } from 'react';

import copy from 'copy-to-clipboard';
import { colorData } from 'data/palette';
import html2canvas from 'html2canvas';
import LZString from 'lz-string';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';

export function useExport() {
  const colorMap = useColorMapStore((state) => state.colorMap);
  const isSaving = useSettingStore((state) => state.isSaving);
  const numOfBoxs = useSettingStore((state) => state.numOfBoxs);
  const backgroundColor = useSettingStore((state) => state.backgroundColor);
  const setModal = usePopupStore((state) => state.setModal);
  const setIsSaving = useSettingStore((state) => state.setIsSaving);

  useEffect(() => {
    if (isSaving) handleSave();
  }, [isSaving]);

  const save = () => {
    setIsSaving(true);
  };

  const handleSave = async () => {
    if (checkKakao()) return;
    setModal({
      key: 'saving',
      title: 'info',
      desc: 'Saving...',
    });
    const elementId = 'capture';
    const element = document.getElementById(elementId);
    let isSuccess = false;
    try {
      if (!element) throw new Error();
      const canvas = await html2canvas(element, { backgroundColor: null });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'dotoori.png';
      link.click();
      isSuccess = true;
    } catch (error) {
      setModal({
        key: 'save-fail',
        title: 'error',
        desc: 'Sorry, saving failed due to an unknown reason.',
        cancelBtn: { title: 'OK' },
      });
      console.log(`save failed: ${error}`);
    } finally {
      setIsSaving(false);
      if (isSuccess) {
        setModal({
          key: 'save-success',
          title: 'success',
          desc: 'Saved!',
          cancelBtn: { title: 'OK' },
        });
      }
    }
  };

  const checkKakao = () => {
    const isKakao = /KAKAOTALK/i.test(navigator.userAgent);
    if (isKakao) {
      setModal({
        key: 'save-fail-kakao',
        title: 'error',
        desc: 'The KakaoTalk in-app browser does not support image downloads. Please try other browsers such as Chrome or Safari.',
        cancelBtn: { title: 'OK' },
      });
    }
    return isKakao;
  };

  const share = async () => {
    const url = `${window.location.origin}/?box=${numOfBoxs}&bg=${backgroundColor}&shared=${compressColorMap()}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch (error) {
        console.log(`share canceled: ${error}`);
      }
      return;
    }
    copyToClipboard(url);
  };

  const compressColorMap = () => {
    const colorList = Object.values(colorData);
    const compressionArr: { [id: number]: string[] } = {};
    for (const [xyIndex, color] of Object.entries(colorMap)) {
      const id = colorList.indexOf(color);
      if (!compressionArr[id]) {
        compressionArr[id] = [];
      }
      compressionArr[id].push(xyIndex);
    }
    const compressionStr: { [id: string]: string } = {};
    for (const [id, xyIndexList] of Object.entries(compressionArr)) {
      compressionStr[id] = xyIndexList.join(',');
    }
    return LZString.compressToEncodedURIComponent(JSON.stringify(compressionStr));
  };

  const copyToClipboard = (url: string) => {
    copy(url);
    setModal({
      key: 'share',
      title: 'success',
      desc: "Your work's URL has been copied successfully.",
      cancelBtn: { title: 'OK' },
    });
  };

  return { save, share };
}
