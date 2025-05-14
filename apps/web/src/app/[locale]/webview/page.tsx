'use client';
import { useEffect } from 'react';
import axios from 'axios';

import CharacterView from './CharacterView';

export default function WebviewPage() {
  useEffect(() => {
    axios.get('/api/render?type=snowman').then((res) => {});
  }, []);
  return (
    <div className="w-full h-screen">
      <CharacterView />
    </div>
  );
}
