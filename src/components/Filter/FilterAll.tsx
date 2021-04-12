import React,{useMemo} from "react";
import { DropdownControlledExample } from "./FilterItem";
import {Stack, PrimaryButton,IStackStyles } from "@fluentui/react";
import {IFilterDropdownItem,IFilterData} from "./Models"
import {
  ITag,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import {TagPickerItem} from "./TagPicker"
import { useForm } from "react-hook-form";



const stackStyles: IStackStyles = {
  root: {
    margin: "2em auto",
    width: "73%",
  },
};



export const AllFilters: React.FC = () => {

  const {handleSubmit,control} = useForm<IFilterData>()

  const onApplyFilter = (data) => {
    handleSubmit((data) =>{
      console.log(data);
      
    })()
    
  }
  const filters:IFilterDropdownItem[] = useMemo(() => {
    return [
      {
        id: 1,
        placeholder: "All",
        label: "Event type",
        options: [
          { key: "Meet-up", text: "Meet-up" },
          { key: "Training", text: "Training" },
          { key: "Internship", text: "Internship" },
        ],
      },
      {
        id: 3,
        placeholder: "All",
        label: "Locations",
        options: [
          { key: "USA", text: "USA" },
          { key: "Belarus", text: "Belarus" },
          { key: "Russia", text: "Russia" },
          { key: "Ukraine", text: "Ukraine" },
        ],
      },
    ];
  },[])

  const eventTags: ITag[] =  useMemo(() => {
    return [
      'JavaScript',
      'Java',
      'Python',
      'React',
      'Web',
      'Frontend',
      'Backend',
      "c#",
      "Junior",
      "TypeScript",
      "Data base",
    
    ].map(item => ({ key: item.toLowerCase(), name: item }));
  }, [])

  return (
    <>
      <Stack styles={stackStyles} horizontal verticalAlign="center" horizontalAlign="space-between" wrap>
        {filters.map((obj: IFilterDropdownItem) => (
          <div key={obj.id}>
            <DropdownControlledExample filterItem={obj} />
          </div>
        ))}
        <TagPickerItem label = "Tags" eventTags={eventTags}></TagPickerItem>
      </Stack>
      <div className="margin2em button_center">
        <PrimaryButton onClick = {onApplyFilter} text="Search" className="button" />
      </div>
    </>
  );
};

export default AllFilters;
