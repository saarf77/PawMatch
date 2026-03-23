import React, { useState } from "react"
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Animated, KeyboardAvoidingView, Platform,
} from "react-native"
import { NameGeneratorService } from "../services/NameGeneratorService"

interface Props {
  onNameSubmit: (name: string) => void
}

const ICON_ROW = ["🦁", "🐯", "🇮🇱", "🇩🇪", "🐻", "🇺🇸", "🐬", "🇯🇵"]

export function NameScreen({ onNameSubmit }: Props) {
  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState("")

  const handlePlay = () => {
    onNameSubmit(NameGeneratorService.generateName())
  }

  const handleNamePlay = () => {
    onNameSubmit(name.trim() || NameGeneratorService.generateName())
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        {/* Animal row */}
        <View style={styles.emojiRow}>
          {ICON_ROW.map((emoji, i) => (
            <Text key={i} style={styles.emoji}>{emoji}</Text>
          ))}
        </View>

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Mind Pairs</Text>
          <Text style={styles.subtitle}>Animals · Flags · More</Text>
        </View>

        {/* Play button */}
        <TouchableOpacity style={styles.playBtn} onPress={handlePlay} activeOpacity={0.8}>
          <Text style={styles.playBtnText}>Play Now! 🎮</Text>
        </TouchableOpacity>

        {/* Optional name input */}
        {!showInput ? (
          <TouchableOpacity onPress={() => setShowInput(true)}>
            <Text style={styles.toggleText}>Want to enter your name?</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.nameForm}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name..."
              placeholderTextColor="rgba(255,255,255,0.45)"
              maxLength={24}
              autoFocus
            />
            <TouchableOpacity style={styles.namePlayBtn} onPress={handleNamePlay} activeOpacity={0.8}>
              <Text style={styles.namePlayBtnText}>
                Play as {name.trim() || "…"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  inner: { width: "100%", maxWidth: 340, paddingHorizontal: 24, alignItems: "center", gap: 28 },
  emojiRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  emoji: { fontSize: 36 },
  titleBlock: { alignItems: "center", gap: 4 },
  title: { fontSize: 56, fontWeight: "900", color: "white", textAlign: "center" },
  subtitle: { fontSize: 17, color: "rgba(255,255,255,0.65)", textAlign: "center" },
  playBtn: {
    width: "100%", height: 60, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center", alignItems: "center",
  },
  playBtnText: { color: "white", fontSize: 22, fontWeight: "800" },
  toggleText: { color: "rgba(255,255,255,0.5)", fontSize: 14, textDecorationLine: "underline" },
  nameForm: { width: "100%", gap: 10 },
  input: {
    width: "100%", height: 50, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.3)",
    color: "white", fontSize: 17, textAlign: "center", paddingHorizontal: 16,
  },
  namePlayBtn: {
    width: "100%", height: 48, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.35)",
    justifyContent: "center", alignItems: "center",
  },
  namePlayBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
})
