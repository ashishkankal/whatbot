import templates from "@/templates";

export default function TemplateGrid() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
    >
      {templates.map((template) => (
        <li
          key={template.slug}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white border hover:shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div>
              <div>
                <span className={"inline-flex rounded-lg"}>
                  <img src={template.iconUrl} className="h-8 w-8" />
                </span>
              </div>
              <a href={`/templates/${template.slug}`}>
                <h3 className="truncate text-lg mt-2 font-medium text-gray-900 hover:text-blue-600">
                  {template.title}
                </h3>
              </a>

              <p className="mt-1 text-gray-500">{template.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
