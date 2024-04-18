export default function Home() {
  return (
    <>
      <h1 className="text-3xl">Test</h1>
      <form action="/api/form" method="get">
        <div>
          Field 1: <input type="text" name="field1" />
        </div>
        <div>
          Field 2: <input type="text" name="field2" />
        </div>
        <div>
          Field 3: <input type="text" name="field3" />
        </div>
        <input type="submit" value="Post" />
      </form>
    </>
  );
}
