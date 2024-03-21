// import {
//     // Dropdown,
//     // IColumn,
//     // IDropdownOption,
//     // Icon,
//     // Label,
//   } from "office-ui-fabric-react";

  
  import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
  import { FontIcon } from '@fluentui/react/lib/Icon';
  import { Label } from '@fluentui/react/lib/Label';
  import { DetailsList, IDetailsListProps } from "@fluentui/react";
  import {
    // DetailsList,
     IColumn } from '@fluentui/react/lib/DetailsList';
  import * as React from "react";
  import { strings } from './loc/strings';
  import styles from "./UniqueRecords.module.scss";
  import { Guid } from "@microsoft/sp-core-library";
  interface PaginationdetailListDetaillistProps
    extends Omit<Omit<IDetailsListProps, "items">, "columns"> {
    columns: IColumn[];
  }
  interface IPropsPaginationDetailList {
    DetailListProps: PaginationdetailListDetaillistProps;
    items: any[];
    onRenderRow?: boolean;
    onPageChange?: () => void;
    DetaillistKey?: string;
  }
  
  const option: IDropdownOption[] = [
    { key: 10, text: "10" },
    { key: 25, text: "25" },
    { key: 50, text: "50" },
    { key: 100, text: "100" },
  ];
  const PaginationDetailList: React.FunctionComponent<
    IPropsPaginationDetailList
  > = ({ DetailListProps, items, onPageChange, DetaillistKey}) => {
    const [count, setCount] = React.useState<number>(10);
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPage = Math.ceil(items.length / count);
  
    const onButtonClick = React.useCallback(
      (type: boolean) => {
        if (type) {
          setCurrentPage((c) => (c >= totalPage ? totalPage : c + 1));
        } else {
          setCurrentPage((c) => (c <= 1 ? 1 : c - 1));
        }
      },
      [totalPage]
    );
    const paginationDropDown = React.useCallback(
      (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setCount(item.key as any);
      },
      []
    );
    React.useEffect(() => {
      setCurrentPage(1);
    }, [items, count]);
     React.useEffect(()=>{
      onPageChange&&onPageChange()
    },[onPageChange&&currentPage+count,onPageChange&&items])
    const gidData=React.useMemo(()=>Guid.newGuid().toString(),[])
    return (
      <>
        <DetailsList
          checkButtonAriaLabel={"select row"}
          setKey={gidData + count + currentPage }
          key={DetaillistKey}
          {...(DetailListProps as any)}
          onShouldVirtualize={() => !(count > 25)}
          items={items.slice(count * (currentPage - 1), count * currentPage)}
        />
  
        <div className="pagination_dev_static_global">
          {items.length < 1 ? (
            <>
              <div
                className="tw-text-center tw-text-[var(--lightThemeTextColorBlack)]"
                style={{ textAlign: "center" }}
              >
                {strings.NoDataAvailable}
              </div>
            </>
          ) : null}
          <div className={styles.pagination_dev_child_BLK}>
            <div className={styles.pagination_dev_show_no_of_pages}>
              <span>
                {items.length < 1 ? (
                  <>0 {strings.of} 0</>
                ) : (
                  <>
                    {currentPage} {strings.of} {totalPage}
                  </>
                )}
              </span>
            </div>
            <div className={styles.pagination_dev_top_BLK}>
              <Label>{strings.ShowEntries}</Label>
              <Dropdown
                options={option}
                onChange={paginationDropDown}
                selectedKey={count}
                placeholder={"10"}
              />
            </div>
            <div className={styles.pagination_dev_previous_and_next}>
              <FontIcon
                className={styles.pagination_dev_previous_next_button}
                iconName="ChevronLeft"
                onClick={() => onButtonClick(false)}
              ></FontIcon>
              <span className={styles.pagination_span}>
                {items.length ? currentPage : 0}
              </span>
              <FontIcon
                className={styles.pagination_dev_previous_next_button}
                iconName="ChevronRight"
                onClick={() => onButtonClick(true)}
              ></FontIcon>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default PaginationDetailList;
  