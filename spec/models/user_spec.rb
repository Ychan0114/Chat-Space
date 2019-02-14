require 'rails_helper'
describe User do
  describe '#create' do
    it "is valid with a name, email, password, password_confirmation" do
        user = build(:user)
        expect(user).to be_valid
    end

    it "is invalid without a name" do
      user = build(:user, name: nil)
       user.valid?
       expect(user.errors[:name]).to include("を入力してください")
    end

    it "is invalid without a email" do
      user = build(:user, email: nil)
       user.valid?
       expect(user.errors[:email]).to include("を入力してください")
    end

    it "is invalid without a password" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("を入力してください")
    end

    it "is invalid without a password_confirmation" do
      user = build(:user, password_confirmation: "")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("とPasswordの入力が一致しません")
    end

    it "is invalid with a duplicate email address" do
      user = create(:user)
      another_user = build(:user)
      another_user.valid?
      expect(another_user.errors[:email]).to include("はすでに存在します")
    end

    it "iis valid with a name that has less than 6 characters" do
      user = build(:user, name: "123456")
      expect(user).to be_valid
    end

    it "is invalid with a name that has more than 7 characters" do
      user = build(:user, name: "1234567")
      user.valid?
      expect(user.errors[:name][0]).to include("は6文字以内で入力してください")
    end

    it "is valid with a password that has more than 6 characters" do
      user = build(:user, password:"123456", password_confirmation:"123456")
      expect(user).to be_valid
    end

    it "is invalid with a password that has less than 5 characters" do
      user = build(:user, password:"12345", password_confirmation:"12345")
      user.valid?
      expect(user.errors[:password][0]).to include("は6文字以上で入力してください")
    end

  end
end
