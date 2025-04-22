export default function CreateVenue() {
  return (
    <>
      <meta
        name="description"
        content="Create a venue by filling out the form."
      />
      <title>Create venue</title>
      <main>
        <h1>Create venue</h1>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" placeholder="Enter a venue name" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Enter a description" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <p>(Per night)</p>
            <input id="price" />
          </div>
          <div>
            <label htmlFor="guests"></label>
            <input id="guests" />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input id="country" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input id="city" />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input id="address" />
          </div>
          <div>
            <label htmlFor="zip">Zip code</label>
            <input id="zip" />
          </div>
          <div>
            <label htmlFor="images">Images</label>
            <p>(URL)</p>
            <input id="images" placeholder="https://exampleurl.com" />
            {/* Images display here */}
            <button>Add</button>
          </div>
          <button type="submit">Create venue</button>
        </form>
      </main>
    </>
  );
}
