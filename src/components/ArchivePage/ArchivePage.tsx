import React, { useEffect } from "react";
import {
  DetailsList,
  getTheme,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  Spinner,
  SpinnerSize,
  ActionButton,
} from "@fluentui/react";
import { useHistory } from "react-router";
import { useId } from "@fluentui/react-hooks";
import { IApplicant } from "../../models/IApplicant";
import { useEvents } from "../../hooks/useEvents";
import ArchiveFilters from "./ArchiveFilters";
import { useLoader } from "../../hooks/hooks";
import { useIsMountedRef } from "../../hooks/useIsMounted";
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
  const { events, fetchAnyEvents, archivedEvents } = useEvents();
  const { loading, showLoader } = useLoader();
  const history = useHistory();
  const isMountedRef = useIsMountedRef();
  useEffect(() => {
    showLoader();
    fetchAnyEvents(0, 6, "archived").then((cb) => {
      if (isMountedRef.current) cb();
    });
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
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 350,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Location",
      fieldName: "location",
      minWidth: 100,
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
          <ActionButton
            iconProps={{ iconName: "OpenFile" }}
            // onClick={() => history.push(`/admin/interviews/${"unknow"}`)} // selected id from state
            aria-describedby={tooltipId}
          ></ActionButton>
        </TooltipHost>
      ),
    },
  ];
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <ArchiveFilters />

      <div
        style={{
          boxShadow: theme.effects.elevation16,
          fontWeight: "bold",
          marginTop: "2rem",
        }}
      >
        <DetailsList
          items={eventList}
          columns={columns}
          isHeaderVisible={true}
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
      </div>
    </>
  );
};
