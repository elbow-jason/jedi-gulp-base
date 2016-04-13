

function safeUser(user) {
  return {
    first_name:     user.first_name,
    last_name:      user.last_name,
    email:          user.email,
    email_verified: user.email_verified,
    birth_date:     user.birth_date,
    provider:       user.provider,
    phone:          user.phone,
    address_1:      user.address_1,
    address_2:      user.address_2,
    city:           user.city,
    state_code:     user.state_code,
    country_code:   user.country_code,
    zip_code:       user.zip_code,
  }
}

module.exports = {
  safeUser: safeUser
};