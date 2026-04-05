import Link from "next/link";

interface BreadcrumbsData {
  BREADCRUMBS?: {
    id: number;
    name: string;
    href: string;
  }[];
  currentPage: string;
  department?:
    | "SOC"
    | "SOC-Wiki"
    | "Allgemeiner Bereich"
    | "Forms"
    | "Admin"
    | "Meetingsberichte"
    | "Verwaltung";
}

const Breadcrumbs = ({
  BREADCRUMBS = [
    { id: 1, name: "Homepage", href: "/" },
    { id: 2, name: "", href: "#" },
  ],
  department,
  currentPage,
}: BreadcrumbsData) => {
  {
    department ? (BREADCRUMBS[1].name = department) : null;
  }

  return (
    <div className="p-2 bg-slate-200">
      <ol className="flex items-center space-x-2">
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center text-sm">
              <Link
                href={breadcrumb.href}
                className="font-medium text-sm text-muted-foreground hover:text-slate-900"
              >
                {breadcrumb.name}
              </Link>

              {i !== BREADCRUMBS.length - 1 ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              ) : null}
            </div>
          </li>
        ))}
        <li>
          <div className="flex items-center text-sm">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>

            {currentPage}
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Breadcrumbs;
