import React from 'react'
import { IUniqueRecordsProps } from './IUniqueRecordsProps'
import Mylist from './Mylist'

const UniqueRecords:React.FC <IUniqueRecordsProps> = (props):JSX.Element => {
  return (
    <div>
      <Mylist weburl={props.webURL} />
    </div>
  )
}

export default UniqueRecords