import "react-country-state-city/dist/react-country-state-city.css";
import InputField from "@/app/components/InputField";
import Button from "@/app/components/Buttons";
import SelectBox from "@/app/components/SelectBox";
import { faCalendar, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { useEffect, useState } from "react";
import { CampaignService } from "@/services/campaign.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ICampaign } from "@/interfaces/campaign.inteface";
export default function CreateCampaign({
  campaign,
  classname,
  onClose,
}: {
  campaign?: ICampaign;
  classname: string;
  onClose: () => void;
}) {
  const session = useSession();
  const router = useRouter();
  const defaultValues = {
    user: session.data?.user.token,
    gender: "Male",
    publishers: "Hulu",
    devices: "CTV",
  };
  const [values, setValues] = useState<Record<string, any>>(
    campaign
      ? { ...campaign, user: session.data?.user.token }
      : defaultValues
  );
  const [countryid, setCountryid] = useState(1);
  const [stateid, setstateid] = useState(0);

  const Heading = ({ children }: any) => (
    <h3 className="text-lg leading-normal text-blue-950 font-semibold mb-4">
      {children}
    </h3>
  );

  const handleDropdownChange = async (name: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCreateCampaign = async () => {
    const res = await CampaignService[values?._id ? "update" : "create"](
      values
    );

    if (!res.error) {
      onClose();
      router.refresh();
    }
  };

  return (
    <div
      className={`${
        classname ? classname : ""
      } fixed top-0 left-0 w-full h-full z-[9999] 
            flex justify-end`}
    >
      <div
        className={`fixed bg-[rgba(198,198,195,0.5)] left-0 top-0 z-[-1] w-full h-full`}
        onClick={onClose}
      ></div>
      <div className="max-w-[550px] md:max-w-[720px] bg-white px-4 sm:px-6 pt-6 pb-20 w-full h-full overflow-auto">
        <div className="relative">
          <button
            className="absolute right-0 top-0 text-xl z-10 md:hidden"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="mb-6">
            <Heading>Campaign Info</Heading>
            <div>
              <InputField
                label="Campaign name"
                fieldValue={values?.name}
                onChange={(value) =>
                  setValues((prev) => ({ ...prev, name: value }))
                }
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <InputField
                  label="Budget"
                  fieldValue={values?.budget}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, budget: value }))
                  }
                />
                <InputField
                  type="date"
                  label="date Range"
                  placeholder="23 Dec 2024 - 23 Mar 2025"
                  fieldValue={{
                    startDate: values?.startDate
                      ? new Date(values?.startDate)
                      : undefined,
                    endDate: values?.endDate
                      ? new Date(values?.endDate)
                      : undefined,
                  }}
                  icon={faCalendar}
                  onChange={(value) =>
                    setValues((prev) => ({
                      ...prev,
                      startDate: value.startDate?.toISOString(),
                      endDate: value.endDate?.toISOString(),
                    }))
                  }
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <InputField
                  label="Age"
                  fieldValue={values?.age}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, age: value }))
                  }
                />
                <SelectBox
                  label="Gender"
                  values={values?.gender}
                  icon={faUser}
                  options={["Male", "Female", "Others"]}
                  onChange={(value) => handleDropdownChange("gender", value)}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="text-sm font-medium text-zinc-400 mb-1 block">
                    Country
                  </label>
                  <CountrySelect
                    defaultValue={
                      {
                        name: values?.country || "Select Country",
                      } as any
                    }
                    onChange={(e: any) => {
                      setCountryid(e.id);
                      setValues((prev) => ({
                        ...prev,
                        country: e.name,
                      }));
                    }}
                    placeHolder="Select Country"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400 mb-1 block">
                    State
                  </label>
                  <StateSelect
                    countryid={countryid}
                    defaultValue={
                      { name: values?.state || "Select State" } as any
                    }
                    onChange={(e: any) => {
                      setstateid(e.id);
                      setValues((prev) => ({ ...prev, state: e.name }));
                    }}
                    placeHolder="Select State"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="text-sm font-medium text-zinc-400 mb-1 block">
                    City
                  </label>
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    defaultValue={
                      { name: values?.city || "Select City" } as any
                    }
                    onChange={(e: any) => {
                      setValues((prev) => ({ ...prev, city: e.name }));
                    }}
                    placeHolder="Select City"
                  />
                </div>
              </div>
              <InputField
                label="Zip Code"
                fieldValue={values?.zip}
                onChange={(value) =>
                  setValues((prev) => ({ ...prev, zip: value }))
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="grid sm:grid-cols-2 gap-3">
              <SelectBox
                label="Publishers"
                icon={faUser}
                values={values?.publishers}
                options={[
                  "Hulu",
                  "Discovery",
                  "ABC",
                  "A&E",
                  "TLC",
                  "Fox News",
                  "Fox Sp",
                ]}
                onChange={(value) => handleDropdownChange("publishers", value)}
              />
              <SelectBox
                label="Devices"
                icon={faUser}
                values={values.devices}
                options={["CTV", "Mobile Device", "Web Browser"]}
                onChange={(value) => handleDropdownChange("devices", value)}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <Button
              bg="bg-gray-950"
              hoverBg="bg-gray-900"
              onClick={onClose}
              isLink={undefined}
              linkUrl={undefined}
              className={undefined}
            >
              Cancel
            </Button>
            <Button
              isLink={undefined}
              linkUrl={undefined}
              onClick={handleCreateCampaign}
              className={undefined}
              bg={undefined}
              hoverBg={undefined}
            >
              {values?._id ? "Update Campaign" : " Create Campaign"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
