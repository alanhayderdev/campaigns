"use client";

import { useMemo, useState } from "react";
import SearchField from "@/app/components/SearchField";
import Button from "@/app/components/Buttons";
import CreateCampaign from "@/app/components/CreateCampaign";
import DataTable from "@/app/components/DataTable";
import { ICampaign } from "@/interfaces/campaign.inteface";
import FilterSelectBox from "@/app/components/FilterSelectBox";

export const CampaignList = ({ data }: { data: ICampaign[] }) => {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaign, setCampaign] = useState<ICampaign>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleEdit = (campaign: ICampaign) => {
    setCampaign(campaign);
    setShowCreateCampaign(true);
  };

  const filteredData = useMemo(() => {
    let filterd;

    filterd =
      filter && filter !== "All"
        ? data.filter((el) => el.country === filter)
        : data;
    filterd = searchQuery.trim()
      ? filterd.filter(
          (el) =>
            el.name &&
            el.name
              ?.toLocaleLowerCase()
              ?.includes(searchQuery.trim()?.toLocaleLowerCase())
        )
      : filterd;

    return filterd || [];
  }, [filter, data, searchQuery]);

  const handleClose = () => {
   setShowCreateCampaign(false);
   setCampaign(undefined);
  }

  return (
    <div className="min-h-screen font-body">
      <div className="py-12 lg:py-24">
        <div className="max-w-[1140px] px-4 mx-auto">
          <h2 className="text-2xl leading-normal text-blue-950 font-semibold mb-7 ßlg:mb-11">
            All Campaigns
          </h2>
          <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mb-11">
            <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] gap-4 w-full sm:w-auto">
              <SearchField
                placeholder={"Find campaigns"}
                className="flex-1 min-w-[180px] w-full"
                onChange={(value) => setSearchQuery(value)}
              />
              <FilterSelectBox
                label="Filter"
                options={["All", ...new Set(data.map((el) => el.country))]}
                defaultValue="Country"
                onChange={(value) => setFilter(value)}
              />
            </div>
            <div className="w-full sm:w-auto flex justify-end">
              <Button
                onClick={() => setShowCreateCampaign(true)}
                className="w-full md:w-auto"
                isLink={undefined}
                linkUrl={undefined}
                bg={undefined}
                hoverBg={undefined}
              >
                CAMPAIGN +
              </Button>
            </div>
          </div>

          <div>
            <DataTable data={filteredData} onEdit={handleEdit} />
          </div>
        </div>
      </div>

      {showCreateCampaign && (
        <CreateCampaign
          classname="visible"
          onClose={handleClose}
          campaign={campaign}
        />
      )}
    </div>
  );
};
