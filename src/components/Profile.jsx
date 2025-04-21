import PastelStreet from "/images/pastel-street-compressed.jpg";

export default function Profile() {
  return (
    <>
      <meta name="description" content="" />
      <title>{/* Add username */}</title>
      <main>
        <img src={<PastelStreet />} alt="" />
        <div>
          <img src="#" alt="" />
          <div>
            <h1>{/* Add username */}This is the profile page</h1>
            <p>{/* Add user title */}</p>
          </div>
          <button title="Click to edit profile">Edit profile</button>
        </div>
        <div>{/* Add accordion here */}</div>
      </main>
    </>
  );
}
