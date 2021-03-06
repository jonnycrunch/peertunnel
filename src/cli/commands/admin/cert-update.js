'use strict'

/* eslint-disable no-console */

const fs = require('fs')
const {OP} = require('../../../common/proto')

module.exports = {
  command: 'cert-update <cert> <key>',

  description: 'Update server certificate and key',

  builder: {
    cert: {
      desc: 'Path to certificate',
      type: 'file',
      required: true
    },
    key: {
      desc: 'Path to certificate key',
      type: 'file',
      required: true
    }
  },

  async handler (argv) {
    const {tunnel, server, cert, key} = argv

    const pi = await tunnel.resolveServer(server)
    await tunnel.admin(pi, {
      type: OP.SET,
      key: 'cert',
      value: fs.readFileSync(cert)
    })
    await tunnel.admin(pi, {
      type: OP.SET,
      key: 'key',
      value: fs.readFileSync(key)
    })

    console.error('Successfully updated cert & key!'.green)

    tunnel.stop()
  }
}
