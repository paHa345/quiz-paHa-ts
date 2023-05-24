import Link from "next/link";

function PageNotFound() {
  return (
    <div className="notFoundContainer">
      <Link href="/">Home Page</Link>
      <div className="notFoundTextContainer">
        <h1>Page Not Found!!!</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
