const request = require("supertest");
const server = require("../index");

describe("Operando CRUD de cafés", () => {

  it("Test de status 200 y tipo de dato es arreglo minimo 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Error 404 al eliminar id inexistente", async () => {
    const jwt = "token";
    const idAElmininar = 777;
    // De la suerte XD

    const response = await request(server)
      .delete(`/cafes/${idAElmininar}`)
      .set("Authorization", jwt)
      .send();

    expect(response.statusCode).toBe(404);
  });

  it("Agregar un café correctamente (201)", async () => {
    const id = 5;
    const producto = { id, nombre: "Maciato" };
    const response = await request(server).post("/cafes/").send(producto);

    expect(response.statusCode).toBe(201);
  });

  it("Error al actualizar cafe con id en params ≠ payload", async () => {
    const idParametro = 2;
    const id = 1;
    const producto = { id, nombre: "Maciato grande" };
    const response = await request(server).put(`/cafes/${idParametro}`).send(producto);

    expect(response.statusCode).toBe(400);
  });
});
