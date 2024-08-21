import { getUser } from '@gitanimals/api';

async function ServerDevPage() {
  // const session = await auth();
  // // const data = await getUser();
  // console.log('data: ', data);

  const data = await getUser();
  console.log('data: ', data);

  // const onClick = async () => {
  // const data = await axios.get('http://localhost:3000/api/auth/jwt');
  // console.log('data: ', data);
  // };

  return (
    <div>
      server{/* <button onClick={onClick}>asd</button> */}
      <div>
        <h3>User</h3>
        <div>{JSON.stringify(data)}</div>
      </div>
    </div>
  );
}

export default ServerDevPage;
