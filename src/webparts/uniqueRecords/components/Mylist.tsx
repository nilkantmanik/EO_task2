import React, { useEffect, useState } from "react";
import { Web } from "@pnp/sp/presets/all";
// import {
//   SPHttpClient,
//   SPHttpClientResponse,
//   MSGraphClientV3,
// } from "@microsoft/sp-http";
import {
  // DetailsList,
  IColumn,
} from "@fluentui/react/lib/DetailsList";

import { Stack } from "@fluentui/react/lib/Stack";

// import { TextField } from "@fluentui/react/lib/TextField";
// import { Stack } from "@fluentui/react/lib/Stack";
// const stackTokens = { childrenGap: 15 };

import PaginationDetailList from "./PaginationDetailList";

import ContextService from "./services/ContextService";

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";

import { ServiceStatusValues } from "./loc/strings";


import { SPHttpClient,SPHttpClientResponse } from "@microsoft/sp-http";

import "./mylist.css";

interface Mylistprops {
  weburl: string;
}

interface ItemExample {
  AppCreatedDate: Date;
  AppName: string;
  Title: string;
  Name: string;
  Tenant: string;
  Email: string;
  ServiceStatus: string;
  Calltype: string;
  TimeZone: string;
  Noofusers: number;
  IPAddress: string;
  Region: string;
  Country: string;
  City: string;
  UserRole: string;
  AppVersion: string;
  Customer: string;
  Modified: string;
  Modified0: string;
  Id: number;
  LicenseKey: string;
  CallFrom: string;
  Created: Date;
}

const Mylist: React.FC<Mylistprops> = ({ weburl }):JSX.Element => {
  const [listitems, setListitems] = useState<ItemExample[]>([]);
  const [filteredlistitems, setfilteredListitems] = useState<ItemExample[]>([]);
  // const [filteredItems, setFilteredItems] = useState<ItemExample[]>([]);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  //    const [uniqueServiceStatus, setUniqueServiceStatus] = useState<string[]>([]);

  const [selectedService, SetselectedService] = useState<string>("all");
  const [selectedDateRange, SetselectedDateRange] = useState<string>("all");

  // const ServiceStatusValues = ['all','Limited', 'Trial', 'P3', 'Paid', "null", 'P2'];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300},
    dropdownItem: {
      backgroundColor: 'lightgray', // Background color for dropdown items
      selectors: {
        '&:hover': {
          backgroundColor: '#00a0f0', // Background color on hover
        },
      },
    },
    dropdownItemSelected: {
      backgroundColor: '#00a0f0', // Background color for selected dropdown item
    },
  };

  const ServiceStatusOptions: IDropdownOption[] = [
    {
      key: "SeviceHeader",
      text: "Service Status",
      itemType: DropdownMenuItemType.Header,
    },
    ...ServiceStatusValues.map((status) => ({ key: status, text: status })),
  ];
  const daysOptions: IDropdownOption[] = [
    {
      key: "CreatedDate",
      text: "Created In",
      itemType: DropdownMenuItemType.Header,
    },
    { key: "all", text: "all" },
    { key: "7", text: "7" },
    { key: "14", text: "14" },
    { key: "21", text: "21" },
    { key: "30", text: "30" },
  ];

  const stackTokens = { childrenGap: 15 };

  // useEffect(() => {
  //   const fetchData = async (): Promise<void> => {
  //     try {
  //       const web1 = Web(weburl);
  //       const items: any[] = await web1.lists
  //         .getByTitle("App Installation List- Unique records")
  //         .items.select("*")
  //         .get();
  //       console.log("------>", items);
  //       setListitems(items);
  //       setfilteredListitems(items);
  //     } catch (error) {
  //       console.log("data fetch error", error);
  //     }
  //   };

  //   fetchData()!;
  // }, []);


console.log("here");


  // useEffect(() => {
  //   const uniqueStatus = Array.from(new Set(listitems.map(item => item.ServiceStatus)));
  //   console.log(uniqueStatus)
  //   setUniqueServiceStatus(uniqueStatus);
  // }, [listitems]);

  console.log("here");



console.log("here");


useEffect(() => {
  getAllAssignAssetData()!
  }, []);

async function getAllAssignAssetData() {
  // await  getAllAssetsNewFields()
  const itemsPerPage = 5000
  let page = 0
  let allitemsCamlquery = []
  let pageitems = null

  getalldata('');
  function getalldata(urlquery) {
    let skipToken = null;
    let listName = 'HR365AMXAssets';
    const camlQuery = `
    <View>
        <Query>
            <OrderBy>
                <FieldRef Name='Modified' Ascending='FALSE' />
            </OrderBy>
        </Query>
        <ViewFields>
            <FieldRef Name='*' />
        </ViewFields>
        <RowLimit Paged='TRUE' RowLimit='${itemsPerPage}' Page='${++page}'/>
    </View>
`;

    const url =
      ContextService.GetUrl() +
      `/_api/web/Lists/getByTitle('App Installation List- Unique records')/RenderListDataAsStream` + urlquery
      ;
    ContextService.GetSPContext()
      .post(url, SPHttpClient.configurations.v1, {
        headers: {
          //   "odata-version": "3.0",
          'Accept': 'application/json;odata=nometadata'
          //   "Content-Type": "application/json;odata=nometadata",

        },
        body: JSON.stringify({
          "parameters": {
            "AddRequiredFields": "true",
            "DatesInUtc": "true",
            "RenderOptions": 2,
            "Paging": JSON.stringify({
              "Paged": true,
              "PageLastRow": pageitems
            }),
            "ViewXml": camlQuery



          }
        })
      })
      .then((response: SPHttpClientResponse) => {

        return response.json();
      }).then((items: any) => {

        // console.log(items)
        const results = items.Row
        allitemsCamlquery = allitemsCamlquery.concat(results);
        if (items.NextHref) {
          pageitems = items.NextHref.split('PageFirstRow=')[1].split('&')[0]
          // page++;
          getalldata(items.NextHref);
        } else {
          // All items have been retrieved
          // console.log('All items:', allitemsCamlquery);
          // NextAssignedAssets(allitemsCamlquery, "", "", "", '');
        }
      }).catch((error) => {
        debugger
        console.log(error)
      })

  }

}

// Call the function
// getAllData();




  const _columns: IColumn[] = [
    {
      key: "column1",
      name: "App Created Date",
      fieldName: "AppCreatedDate",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Title",
      fieldName: "Title",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Name",
      fieldName: "Name",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Tenant",
      fieldName: "Tenant",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column5",
      name: "Email",
      fieldName: "Email",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column6",
      name: "Service Status",
      fieldName: "ServiceStatus",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column7",
      name: "Call Type",
      fieldName: "Calltype",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column8",
      name: "Time Zone",
      fieldName: "TimeZone",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column9",
      name: "Number of Users",
      fieldName: "Noofusers",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column10",
      name: "IP Address",
      fieldName: "IPAddress",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column11",
      name: "Region",
      fieldName: "Region",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column12",
      name: "Country",
      fieldName: "Country",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column13",
      name: "City",
      fieldName: "City",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column14",
      name: "User Role",
      fieldName: "UserRole",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column15",
      name: "App Version",
      fieldName: "AppVersion",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column16",
      name: "Customer",
      fieldName: "Customer",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column17",
      name: "Modified",
      fieldName: "Modified",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column18",
      name: "Modified 0",
      fieldName: "Modified0",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column19",
      name: "Id",
      fieldName: "Id0",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column20",
      name: "License Key",
      fieldName: "LicenseKey",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column22",
      name: "Call From",
      fieldName: "CallFrom0",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column22",
      name: "App Name",
      fieldName: "AppName",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column23",
      name: "Created",
      fieldName: "Created",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  // const paginationDetailListProps = {
  //   columns: _columns,
  //   items: listitems,
  //   onPageChange: () => {
  //     console.log("onPageChange clicked")
  //   },
  // };

  
  const handleservicestausChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined
  ): void => {
    if (item) {
      const selectedServiceStatus = item.key.toString();
      if (selectedServiceStatus === "all") {
        setfilteredListitems(listitems);
      } else {
        const filteredItems = listitems.filter(
          (item) => item.ServiceStatus === selectedServiceStatus
        );
        setfilteredListitems(filteredItems);
      }
      // Set the selected service status
      SetselectedService(selectedServiceStatus);
      SetselectedDateRange("all");
    }
  };

  const filterItemsByDateRange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined
  ): void => {
    const today = new Date();
    if (item) {
      let startDate = new Date(today);
      let range = item.key.toString();
      console.log("range----->", range);
      switch (range) {
        case "7":
          startDate.setDate(today.getDate() - 7);
          break;
        case "14":
          startDate.setDate(today.getDate() - 14);
          break;
        case "21":
          startDate.setDate(today.getDate() - 21);
          break;
        case "30":
          startDate.setDate(today.getDate() - 30);
          break;
        default:
          break;
      }

      // console.log("startDate----->",startDate,"-----",today);

      //-----------------------------------------------------------------
      // const todayUTC = new Date(today.toISOString());
      // todayUTC.setHours(0, 0, 0, 0); // Set time to midnight

      // const startDateUTC = new Date(startDate.toISOString());
      // startDateUTC.setHours(0, 0, 0, 0); // Set time to midnight
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const startDay = startDate.getDate();

      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();

      // console.log("toady---->",today,"--",todayYear,"--",todayMonth,"--",todayDay);
      // console.log("startDate---->",startDate,"--",startYear,"--",startMonth,"--",startDay);

      //-----------------------------------------------------------------

      if (range === "all") {
        setfilteredListitems(listitems);
      } else {
        const filteredItems = listitems.filter((item) => {
          const itemDate = new Date(item.AppCreatedDate);
          const itemYear = itemDate.getFullYear();
          const itemMonth = itemDate.getMonth();
          const itemDay = itemDate.getDate();
          // console.log("itemDate---->",itemDate,"--",itemYear,"--",itemMonth,"--",itemDay);
          return (
            (itemYear > startYear ||
              (itemYear === startYear && itemMonth > startMonth) ||
              (itemYear === startYear &&
                itemMonth === startMonth &&
                itemDay >= startDay)) &&
            (itemYear < todayYear ||
              (itemYear === todayYear && itemMonth < todayMonth) ||
              (itemYear === todayYear &&
                itemMonth === todayMonth &&
                itemDay <= todayDay))
          );
        });
        
          // const filteredItems = listitems.filter(item => {
          //   const itemDate = item.AppCreatedDate;
          //   return itemDate >= startDate && itemDate <= today;
          // });
        setfilteredListitems(filteredItems);
      }
      SetselectedDateRange(range);
      SetselectedService("all");
    }
  };

  return (
    <div className="container">
      <span>App Licence Management</span>

      <div className="apptextdiv">
        <span className="text">App Licence Management</span>
      </div>

      {/* <div>
                
      <Stack tokens={stackTokens}>
            <TextField
              label="Search by Name or Title"
              required
              value={searchQuery}
              onChange={handleSearch}
            />
            </Stack>
      </div> */}

      {/* <DetailsList items={listitems} columns={_columns} /> */}

      {/* <PaginationDetailList items={listitems} DetailListProps={undefined} /> */}

      {/* <Stack tokens={stackTokens}>
                <label
                htmlFor="locationid"
                style={{ fontSize: "medium", fontWeight: "500" }}
                >
                Preferred Locations
                </label>
                <Dropdown
                    placeholder="Select options"
                    //label="Preferred Locations"
                    // defaultSelectedKeys={['Bangalore']}
                    options={locationoptions}
                    styles={dropdownStyles}
                    onChange={handleLocationChange}
                    selectedKeys={selectedLocations}
                />
            </Stack> */}

    <div style={{display:"flex",justifyItems:"center"}}>

      <div >
        <Stack tokens={stackTokens}>
          <label
            htmlFor="servicestatus"
            style={{ fontSize: "medium", fontWeight: "500" }}
          >
            Service Status
          </label>
          <Dropdown
            placeholder="Service Status"
            options={ServiceStatusOptions}
            styles={dropdownStyles}
            onChange={handleservicestausChange}
            selectedKey={selectedService}
          />
        </Stack>
        </div>
        <div>
        <Stack tokens={stackTokens}>
          <label
            htmlFor="Date Range"
            style={{ fontSize: "medium", fontWeight: "500" }}
          >
            Date Range
          </label>
          <Dropdown
            placeholder="DateRange"
            options={daysOptions}
            styles={dropdownStyles}
            onChange={filterItemsByDateRange}
            selectedKey={selectedDateRange}
          />
        </Stack>
      </div>

      </div>

      <PaginationDetailList
        items={filteredlistitems}
        DetailListProps={{ columns: _columns }}
      />
    </div>
  );
};

export default Mylist;
