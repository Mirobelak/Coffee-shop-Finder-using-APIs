import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from "../../styles/coffee-store.module.css"
import Image from 'next/image'
import cls from 'classnames'
import nearMe from "../../public/icons/nearMe.svg"
import places from "../../public/icons/places.svg"
import upvote from "../../public/icons/upvote.svg"
import { fetchCoffeeStores } from '../../lib/coffee-stores'

export async function getStaticPaths() {
  const coffeeStores  = await fetchCoffeeStores()
  const paths = coffeeStores.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }))

  return {
    paths,
    fallback: false, 
  }
}

export async function getStaticProps(staticProps) {
  const coffeeStores  = await fetchCoffeeStores()
  const params = staticProps.params
    return {
      props: {
        coffeeStores: coffeeStores.find((coffeeStore) => coffeeStore.id.toString() === params.id),
      },
    }
  }

const CoffeStore = (props) => {
  const {name,address,locality, imgUrl} = props.coffeeStores

  const handleUpvoteButton = () => {}

  return (
      <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
     <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a> ← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src={nearMe} width="24" height="24" />
            <p className={styles.text}>{address}</p>
            </div>
          <div className={styles.iconWrapper}>
            <Image src={places} width="24" height="24" />
            <p className={styles.text}>{locality}</p>
            </div>
          <div className={styles.iconWrapper}>
            <Image src={upvote} width="24" height="24" />
            <p className={styles.text}>10</p>
            </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton} >
            Up vote !
          </button>
        </div>
      </div>
      </div>
  )
}

export default CoffeStore