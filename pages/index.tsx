import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import Link from 'next/link'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-7xl flex-col
      py-20 px-10 2xl:px-0"
    >
      <Head>
        <title>NFT drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 text-4xl font-extralight">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
          PAPAFAM
        </span>{' '}
        NFT Market Place
      </h1>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"] {
  _id,
  title,
  address,
  description,
  nftColletcioName,
  mainImage {
      asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator-> {
    _id,
    name,
    address,
    slug {
        current
    },
  },
}`
  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
