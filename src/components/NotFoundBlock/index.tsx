import React, { FC } from 'react'

import cls from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  return (
    <div className={cls.notfound}>
      <h1 className={cls.notfound__title}>
        <span>😕</span>
        Ничего не найдено
      </h1>
      <p className={cls.notfound__description}>К сожалению данная страница отсутсвует в нашем магазине</p>
    </div>
  )
}

export default NotFoundBlock