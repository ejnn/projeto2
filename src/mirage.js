import { createServer, Model, Factory } from "miragejs";
import faker from "faker/locale/pt_BR";

const digitsFormatter = digits => new Intl.NumberFormat("pt-BR", { useGrouping: false,
								   minimumIntegerDigits: digits });
const randomInt = sup => Math.floor(Math.random() * Math.floor(sup));

export default function startServer() {
    createServer({
	models: {
	    processo: Model,
	},

	factories: {
	    processo: Factory.extend({
		numero() {
		    return (
			"SOFT " 
			    + (new Date(faker.date.past()).getFullYear()).toString()
			    + "/" + digitsFormatter(5).format(faker.random.number())
		    );
		},

		entrada() {
		    return new Date(faker.date.past()).toLocaleDateString("pt-BR");
		},

		descricao() {
		    return faker.random.words(randomInt(40) + 400);
		},

		assunto() {
		    return faker.random.words(randomInt(5) + 2);
		},

		interessados() {
		    return new Array(randomInt(6) + 1).fill(1).map(() => faker.name.findName());
		},
	    }),
	},

	routes() {
	    this.post("/processo", (schema, request) => {
		const attrs = JSON.parse(request.requestBody);
		return schema.processos.create({
		    ...attrs,
		    numero: "SOFT "
			+ (new Date(faker.date.past()).getFullYear()).toString()
			+ "/" + digitsFormatter(5).format(faker.random.number()),
		    entrada: new Date(faker.date.past()).toLocaleDateString("pt-BR"),
		});
	    });

	    this.get("/processo/:id", (schema, request) => {
		return schema.processos.find(request.params.id);
	    });

	    this.get("/processo", (schema, request) => {
		const query = request.queryParams.q;
		return schema.processos
		    .where(processo => Object.values(processo).some(value => value.includes(query)));
	    });

	    this.delete("/processo/:id", (schema, request) => {
		return schema.processos.find(request.params.id).destroy();
	    });

	    this.patch("/processo/:id", (schema, request) => {
		const newAttrs = JSON.parse(request.requestBody);
		return schema.processos.find(request.params.id).update(newAttrs);
	    });
	},

	seeds(server) {
	    server.createList("processo", randomInt(40));
	}
    });
};
