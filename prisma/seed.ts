import { PrismaClient } from '@prisma/client'
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

const prisma = new PrismaClient()

type CsvRow = {
    travelId: number;
    name: string;
    dateIni: string;
    dateFin: string;
    cityIni: string;
    cityFin: string;
    activities: string;
};

async function main() {

    const csvFilePath = path.resolve(__dirname, '/home/eloi/Downloads/hackupc-travelperk-dataset-extended.csv');
    const headers = ['travelId', 'name', 'dateIni', 'dateFin', 'cityIni', 'dateFin', 'activities'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, (error, result: CsvRow[]) => {
        if (error) {
            console.error(error);
        }

        result.forEach(element => {
            console.log(element);
        });
    });

    // const createMany = await prisma.user.createMany({
    //     data: [
    //         {
    //             username: 'Bob',
    //             email: 'bob@prisma.io',
    //             password: '1234'
    //         },
    //         {
    //             username: 'Jose',
    //             email: 'jose@prisma.io',
    //             password: '1234'
    //         },
    //         {
    //             username: 'Carlos',
    //             email: 'carlos@prisma.io',
    //             password: '1234'
    //         },
    //         {
    //             username: 'Alicia',
    //             email: 'alicia@prisma.io',
    //             password: '1234'
    //         },
    //     ]
    // })
    // console.log({ createMany })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
