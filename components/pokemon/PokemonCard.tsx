import { SmallPokemon } from "@/interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"
import 'animate.css'

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
    const { id, img, name } = pokemon

    const router = useRouter()

    const onClick = () => {
        //router.push(`/pokemon/${id}`)
        router.push(`/name/${name}`)
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={id} className="col animate__animated animate__fadeIn">
            <Card 
                hoverable 
                clickable
                onClick={onClick}
                className="shadow-lg rounded-md"
            >
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify="space-between">
                        <Text transform="capitalize">{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
