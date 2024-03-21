// import React, { useState, useEffect } from 'react';
// import { Announced } from '@fluentui/react/lib/Announced';
// import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
// import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
// import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
// import { mergeStyles } from '@fluentui/react/lib/Styling';

// const exampleChildClass = mergeStyles({
//   display: 'block',
//   marginBottom: '10px',
// });

// const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

// const DetailsListCompactExample = () => {
//   const [items, setItems] = useState([]);
//   const [selectionDetails, setSelectionDetails] = useState('');
//   const [selection] = useState(new Selection());
//   const [allItems] = useState(() => {
//     const tempItems: = [];
//     for (let i = 0; i < 200; i++) {
//       tempItems.push({
//         key: i,
//         name: 'Item ' + i,
//         value: i,
//       });
//     }
//     return tempItems;
//   });
//   const [columns] = useState([
//     { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
//     { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
//   ]);

//   useEffect(() => {
//     setItems(allItems);
//     setSelectionDetails(_getSelectionDetails());
//   }, []);

//   const _getSelectionDetails = () => {
//     const selectionCount = selection.getSelectedCount();

//     switch (selectionCount) {
//       case 0:
//         return 'No items selected';
//       case 1:
//         return '1 item selected: ' + (selection.getSelection()[0] as IDetailsListCompactExampleItem).name;
//       default:
//         return `${selectionCount} items selected`;
//     }
//   };

//   const _onFilter = (ev, text) => {
//     setItems(text ? allItems.filter(i => i.name.toLowerCase().indexOf(text.toLowerCase()) > -1) : allItems);
//   };

//   const _onItemInvoked = (item) => {
//     alert(`Item invoked: ${item.name}`);
//   };

//   return (
//     <div>
//       <div className={exampleChildClass}>{selectionDetails}</div>
//       <Announced message={selectionDetails} />
//       <TextField
//         className={exampleChildClass}
//         label="Filter by name:"
//         onChange={_onFilter}
//         styles={textFieldStyles}
//       />
//       <Announced message={`Number of items after filter applied: ${items.length}.`} />
//       <MarqueeSelection selection={selection}>
//         <DetailsList
//           compact={true}
//           items={items}
//           columns={columns}
//           setKey="set"
//           layoutMode={DetailsListLayoutMode.justified}
//           selection={selection}
//           selectionPreservedOnEmptyClick={true}

//           onItemInvoked={_onItemInvoked}
//           ariaLabelForSelectionColumn="Toggle selection"
//           ariaLabelForSelectAllCheckbox="Toggle selection for all items"
//           checkButtonAriaLabel="select row"
//         />
//       </MarqueeSelection>
//     </div>
//   );
// };

// export default DetailsListCompactExample;


  // return (
          //   (itemYear > startYear ||
          //     (itemYear === startYear && itemMonth > startMonth) ||
          //     (itemYear === startYear &&
          //       itemMonth === startMonth &&
          //       itemDay >= startDay)) &&
          //   (itemYear < todayYear ||
          //     (itemYear === todayYear && itemMonth < todayMonth) ||
          //     (itemYear === todayYear &&
          //       itemMonth === todayMonth &&
          //       itemDay <= todayDay))
          // );
          // return (
          //   (itemMonth > startMonth || (itemMonth === startMonth && itemDay >= startDay)) &&
          //   (itemMonth < todayMonth || (itemMonth === todayMonth && itemDay <= todayDay))
          // );
