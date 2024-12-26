import Collection from "@/app/ui/collection";

const Page = async ({ params }: { params: Promise<{ collection: string }> }) => {
  const collectionID = (await params).collection

  return(
    <Collection collectionID={collectionID} />
  )
}

export default Page;
