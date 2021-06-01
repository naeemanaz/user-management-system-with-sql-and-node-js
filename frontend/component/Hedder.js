import { useRouter } from "next/router";
import Link from "next/link";
export default function Hedder({ state, setState }) {
  const router = useRouter();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">User Management System</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            {router.asPath !== "/" && (
              <button
                className="btn btn-outline-light"
                aria-current="page"
                style={{ marginRight: "50px" }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                Home
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
