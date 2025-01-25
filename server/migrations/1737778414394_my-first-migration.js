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
  pgm.createTable("investment", {
    id: { type: "serial", primaryKey: true },
    total_investing: { type: "numeric(20, 2)", notNull: true, default: 0.00 },
  });

  pgm.createTable("deposit", {
    id: { type: "serial", primaryKey: true },
    buying_power: { type: "numeric(10, 2)", notNull: true, default: 0.00 },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("deposit");
  pgm.dropTable("investment");
};
