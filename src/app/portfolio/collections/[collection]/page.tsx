import Collection from "@/app/ui/collection";

const Page = async ({ params }: { params: Promise<{ collection: string }> }) => {
  const collection = (await params).collection

  return(
    <Collection collection={collection} />
  )
}

export default Page;
