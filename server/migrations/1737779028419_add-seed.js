/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Data to insert into deposit table
  const deposits = [
    {
      buying_power: "500",
    },
  ];

  for (const deposit of deposits) {
    pgm.sql(`
	INSERT INTO deposit (buying_power)
	VALUES ('${deposit.buying_power}');
	`);
  }

  // Data to insert into investment table
  const investments = [
    {
      total_investing: "1000",
    },
  ];

  for (const investment of investments) {
    pgm.sql(`
        INSERT INTO investment (total_investing)
        VALUES ('${investment.total_investing}');
        `);
  }
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
