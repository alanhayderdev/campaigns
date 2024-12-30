import { ICampaign } from "@/interfaces/campaign.inteface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { CampaignService } from "@/services/campaign.service";
import { useRouter } from "next/navigation";
export default function DataTable({
  data,
  onEdit,
}: {
  data: ICampaign[];
  onEdit: (value: ICampaign) => void;
}) {
  const router = useRouter();

  const handleDeleteConfirmation = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await handleDelete(id);
    }
  }
  const handleDelete = async (id: string) => {
    try {
      await CampaignService.delete(id);
    } catch (error: any) {
      alert(error.message);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse rounded bg-white overflow-hidden min-w-[800px] text-left">
        <thead className="bg-white">
          <tr>
            <th
              className="text-xs leading-normal font-semibold text-blue-950 border-r border-b
                        border-gray-100 px-4 py-7 text-left"
            >
              <div className="inline-flex items-center">
                <span className="w-3 h-3 flex-[0_0_12px] rounded-full bg-gray-300 inline-block mr-2 align-middle relative top-[-1px]"></span>
                Campaign
              </div>
            </th>
            {[
              "Budget",
              "country",
              "state",
              "city",
              "gender",
              "publishers",
              "devices",
              "start Date",
              "end Date",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="text-xs capitalize leading-normal font-semibold text-blue-950 border-r border-b
                                    border-gray-100 px-4 py-7 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className="bg-white">
              <td
                className="text-sm leading-normal font-normal text-blue-950 border-r border-b
                            border-gray-100 px-4 py-7"
              >
                <div className="inline-flex items-start">
                  <span className="w-3 h-3 flex-[0_0_12px] rounded-full bg-gray-300 inline-block mr-2 align-top relative top-[5px]"></span>
                  <span className="max-w-[90px] inline-block">{row.name}</span>
                </div>
              </td>
              {[
                row.budget,
                row.country,
                row.state,
                row.city,
                row.gender,
                row.publishers,
                row.devices,
                format(new Date(row.startDate || Date.now()), "dd MMM yyyy"),
                format(new Date(row.endDate || Date.now()), "dd MMM yyyy"),
              ].map((cell, index) => (
                <td
                  key={index}
                  className="text-sm leading-normal font-normal text-blue-950 border-r border-b
                            border-gray-100 px-4 py-7"
                >
                  {cell}
                </td>
              ))}
              <td>
                <div className="flex px-2 items-center gap-2">
                  <button onClick={() => handleDeleteConfirmation(row._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button onClick={() => onEdit(row)}>
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
