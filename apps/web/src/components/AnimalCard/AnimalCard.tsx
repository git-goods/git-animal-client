import React from 'react';
import { css } from '_panda/css';


interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {

  return <div className={container}>AnimalCard</div>;
}

export default AnimalCard;

const container = css({
  background: 'white',
});
