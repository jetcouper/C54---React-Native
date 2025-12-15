package com.example.examenfinale

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.graphics.Color
import android.graphics.Path
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.io.ObjectInputStream
import java.util.Objects
import java.util.Scanner

class MainActivity : AppCompatActivity() {
    lateinit var textSoleil : TextView
    lateinit var btnSoleil : Button
    lateinit var viewOrange : View
    var miliSeconde : Int = 0
    var message : String = ""


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val ofi: InputStream = getResources().openRawResource(R.raw.serialisation)
        val ois = ObjectInputStream(ofi)//Buffer(Tampon) spécial pour les objets

        ois.use {
            miliSeconde = ois.readObject() as Int
            message = ois.readObject() as String
        }


        btnSoleil = findViewById(R.id.btnDemarer)
        textSoleil = findViewById(R.id.txtTexte)
        viewOrange = findViewById(R.id.view)
        textSoleil.text = message
        textSoleil.setTextColor(Color.TRANSPARENT)
        textSoleil.setZ(1f)

        val p: Path = Path()
        p.moveTo(445f,200f)
        p.lineTo(445f,1000f)


        val anim = ObjectAnimator.ofFloat(viewOrange, View.X,View.Y,p)
        val aniAlpha = ObjectAnimator.ofFloat(textSoleil, View.ALPHA,1f)
        val animGrosseurX = ObjectAnimator.ofFloat(viewOrange, View.SCALE_X, 15f)
        val animGrosseurY = ObjectAnimator.ofFloat(viewOrange, View.SCALE_Y, 15f)
        val aniCouleur = ObjectAnimator.ofArgb(textSoleil,"textColor", Color.TRANSPARENT, Color.WHITE)
        val animeSet2 = AnimatorSet()
        animeSet2.duration = miliSeconde.toLong()


        val animeSetSequence = AnimatorSet()

        val animeSet = AnimatorSet()
        animeSet.duration = miliSeconde.toLong()



        animeSet.playTogether(anim,aniAlpha)

        animeSet2.playTogether(animGrosseurY,animGrosseurX,aniCouleur)

        animeSetSequence.playSequentially(animeSet,animeSet2)



        btnSoleil.setOnClickListener{
            animeSetSequence.start()

        }



    }
}