import React from 'react'
import Image from 'next/image';
import subtasklogo from '../../public/jiraImages/subtasklogo.svg';
import medium from '../../public/jiraImages/medium.svg';

function subtaskCard2() {
  return (
    <>
      <div className='custom-secondary-btn' style={{ "backgroundColor": "#fff", "padding": "3px", "borderRadius": "2px", "height": "126px" }}>
        <span className='align-self-center' style={{ "fontSize": "12px", "padding": "0 2px", "fontWeight": "400", "lineHeight": "20px" }}>
          QA Test creation and Test execution
        </span>

        <div className='priority-icons d-flex mx-1 my-2' style={{ "gap": "3px" }}>
          <Image src={subtasklogo} alt="subtasklogo" />
          <Image src={medium} alt="priority-medium" />
        </div>
        <div className='ticket-assignee d-flex align-items-center'>
          <div className='individual-asignee' style={{ "borderRadius": "50%", "backgroundColor": "#76bbc9", "color": "#000", "height": "25px", "width": "25px", "fontSize": "14px", "textAlign": "center", "border": "2px solid #fff" }}>
            P
          </div>
          <span style={{ "fontSize": "12px", "padding": "0 5px","fontWeight":"400"}}>
                        RECHARGE-2861
                    </span>
        </div>
      </div>
    </>
  )
}

export default subtaskCard2