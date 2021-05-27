import React, { useEffect, useMemo } from "react";
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
import { EventStatus } from "../../models/IEvent";
import { eventTypeReformer } from "../../utils/stringReformers";

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
  const { fetchEvents, archivedEvents } = useEvents();
  const { loading, showLoader } = useLoader();
  const isMountedRef = useIsMountedRef();
  useEffect(() => {
    showLoader();
    fetchEvents(0, 6, null, EventStatus.Archived).then((cb) => {
      if (isMountedRef.current) cb();
    });
  }, []);

  const eventList = useMemo(
    () =>
      Object.values(archivedEvents).map((idx) => {
        return {
          event: eventTypeReformer(idx.type),
          name: idx.name,
          location: [...new Set(idx.locations.map((el) => ` ${el.country} `))],
        };
      }),
    [archivedEvents]
  );

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Event type",
      fieldName: "event",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Location",
      fieldName: "location",
      minWidth: 100,
      maxWidth: 600,
      isResizable: true,
    },
  ];
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
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
        />
      </div>
    </>
  );
};
