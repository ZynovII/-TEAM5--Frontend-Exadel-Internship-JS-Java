import React, { useEffect } from "react";
import {
  DetailsList,
  getTheme,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useHistory } from "react-router";
import { useId } from "@fluentui/react-hooks";
import { IApplicant } from "../../models/IApplicant";
import { useEvents } from "../../hooks/hooks";
import  ArchiveFilters  from "./ArchiveFilters"
const theme = getTheme();
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

export interface IApplicantList {
  columns: IColumn[];
  items: IApplicant[];
}
export const ArchiveEventList: React.FC = () => {
  const { events, loading, fechEvents } = useEvents();
  const history = useHistory();
  useEffect(() => {
    fechEvents();
  }, []);

  const eventList = Object.keys(events).map((idx) => {
    return {
      event: events[idx].type,
      name: events[idx].name,
      location: events[idx].city,
    };
  });

  const tooltipId = useId("tooltip");
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Event type",
      fieldName: "event",
      minWidth: 170,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Name",
      fieldName: "name",
      minWidth: 170,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Location",
      fieldName: "location",
      minWidth: 170,
      maxWidth: 300,
      isResizable: true,
    },
       {
      key: "column5",
      name: "More",
      isIconOnly: true,
      fieldName: "",
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      onRender: () => (
        <TooltipHost
          content="Show more information"
          id={tooltipId}
          calloutProps={calloutProps}
          styles={hostStyles}
        >
          <a href="#" aria-describedby={tooltipId}>
            <i className={`ms-Icon ms-Icon--More`} />
          </a>
        </TooltipHost>
      ),
    },
  ];
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
    <ArchiveFilters />
    <div style={{ height: "70vh", position: "relative", margin: "2rem auto 0", width: '93%' }}>
      <div style={{ boxShadow: theme.effects.elevation16, fontWeight: "bold" }} >
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <DetailsList
            items={eventList}
            columns={columns}
            isHeaderVisible={false}
            selectionMode={SelectionMode.multiple}
            onRenderRow={(props, defaultRender) => (
                <div>
                  {defaultRender({
                    ...props,
                    styles: { root: { fontSize: 16 } },
                  })}
                </div>
              )}
            // onItemInvoked={(item) =>
            //   history.push(`/admin/candidates/${item.name}`)
            // }

          />
        </ScrollablePane>
      </div>
    </div>
    </>
  );
};
