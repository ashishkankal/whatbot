import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const prompts = [
  {
    id: 1,
    slug: "leetcode-assistant",
    name: "LeetCode Assistant",
    description:
      "Your personal programming coach powered by ChatGPT. Just share your solution and get instant feedback on what's going wrong.",
    icon: AcademicCapIcon,
  },
  {
    id: 2,
    slug: "leetcode-assistant",
    name: "Jane Cooper",
    description: "Regional Paradigm Technician",
    icon: BanknotesIcon,
  },
  {
    id: 3,
    slug: "leetcode-assistant",
    name: "Jane Cooper",
    description: "Regional Paradigm Technician",
    icon: CheckBadgeIcon,
  },
  {
    id: 4,
    slug: "leetcode-assistant",
    name: "Jane Cooper",
    description: "More changes",
    icon: ClockIcon,
  },
  {
    id: 5,
    slug: "leetcode-assistant",
    name: "Jane Cooper",
    description: "Regional Paradigm Technician",
    icon: ReceiptRefundIcon,
  },
];

export default function TemplateGrid() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 "
    >
      {prompts.map((prompt) => (
        <li
          key={prompt.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white border hover:shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div>
              <div>
                <span
                  className={
                    "inline-flex rounded-lg p-3  text-sky-700 bg-sky-50"
                  }
                >
                  <prompt.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <a href={`/templates/${prompt.slug}`}>
                <h3 className="truncate text-lg mt-4 font-medium text-gray-900 hover:text-blue-600">
                  {prompt.name}
                </h3>
              </a>

              <p className="mt-1 text-gray-500">{prompt.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
