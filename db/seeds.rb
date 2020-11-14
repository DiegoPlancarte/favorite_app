3.times do |user|
  User.create!(
    email: "test#{user}@email.com",
    password: "123456",
    password_confirmation: "123456"
  )
end

puts "3 users created"

10.times do |item|
  Item.create!(
    title: "My Item Title #{item}",
    user_id: rand(1..3)
  )
end

puts "10 items created"