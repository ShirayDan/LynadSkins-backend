import SkinModel from '../models/Skin.js'

export const getAll = async (req, res) => {
	try {
		const skins = await SkinModel.find({
			user: { $ne: req.body.user },
			onTrade: true,
		})

		res.json(skins)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Skins getting failed' })
	}
}

export const create = async (req, res) => {
	try {
		const doc = new SkinModel({
			itemName: req.body.itemName,
			skinName: req.body.skinName,
			exterior: req.body.exterior,
			rarity: req.body.rarity,
			price: req.body.price,
			float: req.body.float,
			statTrak: req.body.statTrak,
			souvenir: req.body.souvenir,
			type: req.body.type,
			color: req.body.color.split(','),
			imageUrl: req.body.imageUrl,
			user: req.userId,
		})
		const skin = await doc.save()
		res.json(skin)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Skin creating failed' })
	}
}

export const getUserSkins = async (req, res) => {
	try {
		const userId = req.userId

		await SkinModel.find({
			user: userId,
		}).then((skin) => {
			res.json(skin)
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'User Skins getting failed' })
	}
}

export const updateSkin = async (req, res) => {
	try {
		await SkinModel.updateOne(
			{ _id: req.body._id },
			{
				itemName: req.body.itemName,
				skinName: req.body.skinName,
				exterior: req.body.exterior,
				rarity: req.body.rarity,
				price: req.body.price,
				float: req.body.float,
				statTrak: req.body.statTrak,
				souvenir: req.body.souvenir,
				type: req.body.type,
				color: req.body.color.split(','),
				imageUrl: req.body.imageUrl,
				onTrade: req.body.onTrade,
				user: req.userId,
			}
		).then(() =>
			res.json({
				success: true,
			})
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Updating skins failed' })
	}
}
