

export async function generateStaticParams() {
  return [{ id: '1'  }];
}


export default async function TrackingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  
 const { id } = await params

    return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {id}</p>
    </div>
  );
};

