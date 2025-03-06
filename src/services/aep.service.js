const { Pool } = require("pg");
const { user, password } = require("../configs/env.config");

const pool = new Pool({
  host: "omniproamerps.platform-query.adobe.io",
  port: 80,
  user,
  password,
  database: "development-sandboox:all",
  ssl: true,
});

const getEvents = async () => {
  let client;
  try {
    client = await pool.connect(); // Obtiene una conexión del pool
    console.log("✅ Conectado a PostgreSQL");

    const sql = `
            select
              _omniproamerps.ecid,
              environment.browserDetails.userAgent,
              placeContext.ianaTimezone "timezone",
              placeContext.geo.city,
              placeContext.geo.countryCode,
              eventType,
              web.webInteraction.region,
              web.webInteraction.name,
              web.webPageDetails.URL,
              "timestamp"
            from
              ds_interaction_web_sdk_shamir
            where
              eventType = 'decisioning.propositionDisplay'
              and DATE("timestamp") = DATE('2025-02-26')
            order by
              "timestamp" desc
            limit 20
        `;

    const res = await client.query(sql);
    return res.rows;
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    throw new Error("There was a problem getting the events");
  } finally {
    if (client) {
      client.release(); // Devuelve la conexión al pool en lugar de cerrarla
      console.log("✅ Conexión liberada");
    }
  }
};

module.exports = {
  getEvents,
};
