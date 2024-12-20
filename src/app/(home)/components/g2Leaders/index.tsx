import React from 'react'
import Winter from './winter';
import Spring from './spring';
import Summer from './summer';
import Fall from './fall';

const G2Leaders = () => {
    return (
      <div className='grid grid-cols-4 gap-4'>
        <div className="col-span-1">
          <Winter />
        </div>
        <div className="col-span-1">
          <Spring />
        </div>
        <div className="col-span-1"><Summer/></div>
        <div className="col-span-1"><Fall/></div>
    </div>
  )
};

export default G2Leaders;